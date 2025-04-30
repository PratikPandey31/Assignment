import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try { 
    const client = await clientPromise; 
    const db = client.db("Assignment");
    const collection = db.collection("doctors");

    const doctors = await collection.find({}).toArray();

    return Response.json(doctors, { status: 200 }); 
  } catch (error) {
    console.error("GET error:", error);
    return Response.json({ message: "Error fetching doctors", error: error.message }, { status: 500 });
  }
}
