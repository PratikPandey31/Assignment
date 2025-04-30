import clientPromise from "../../../../lib/mongodb"; 

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("Assignment"); 
    const collection = db.collection("doctors"); 

    const body = await req.json();
    await collection.insertOne(body); 

    return Response.json({ message: "Data saved successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return Response.json({ message: "Database error", error: error.message }, { status: 500 });
  }
}

  