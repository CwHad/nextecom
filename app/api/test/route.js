import dbConnect from '../../../utils/dbConnect';

export async function GET(req) {
    await dbConnect();
    return new Response(JSON.stringify({ message: "Database connection tested" }), {
        headers: { "Content-Type": "application/json" },
    });
}
