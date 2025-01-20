import { NextResponse } from "next/server"

const GET = async () => {
    return NextResponse.json({
        time: new Date().toLocaleDateString()
    });
}

export { GET }