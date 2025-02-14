import { Request, Response } from "express";
import { db } from "../config/firebaseConfig.js";
import { calculateRanking } from "../entities/user.js";
import { User } from "@ebuddy/shared";

export const fetchUserData = async (req: Request, res: Response) => {
  const pageSize = parseInt(req.query.pageSize as string) || 1;
  const query = await db.collection("USERS");
  const snapshot = await query.get();
  const users: User[] = snapshot.docs.map((doc) => doc.data() as User);
  const rankedUsers = users
      .map(user => ({ ...user, rank: calculateRanking(user) }))
      .sort((a, b) => b.rank - a.rank);
    return res.json(rankedUsers);
};

export const updateUserData = async (req: Request, res: Response) => {
  // const userId = req.params.userId; // Ensure userId is provided
  const { userId, totalAverageWeightRatings, numberOfRents, recentlyActive } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    await db.collection("USERS").doc(userId).set(
      {
        totalAverageWeightRatings,
        numberOfRents,
        recentlyActive,
      },
      { merge: true } // Merge updates
    );

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRankedUsers = async (req: Request, res: Response) => {
  try {
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const lastUserId = req.query.lastUserId as string | undefined;

    let query = await db.collection("USERS").orderBy("totalAverageWeightRatings", "desc").limit(pageSize);

    if (lastUserId) {
      const lastUserDoc = await db.collection("USERS").doc(lastUserId).get();
      if (!lastUserDoc.exists) {
        return res.status(400).json({ error: "Invalid last user ID" });
      }
      query = query.startAfter(lastUserDoc);
    }

    const snapshot = await query.get();
    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(users);
  } catch (error) {
    console.error("Error fetching ranked users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

