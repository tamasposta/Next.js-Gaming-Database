import { NextRequest, NextResponse } from "next/server";


export function GET(
    request: NextRequest,
    { params }: { params: { id: number } }) {

    // In real app we fetch data from a db
    // If not found, we return a 404 error

    if (params.id > 10)
        return NextResponse.json(
            { error: 'User not found' },
            { status: 404 })

    // Else return data

    return NextResponse.json({ id: 1, username: 'Mosh' })
}

export async function POST(request: NextRequest) {
    const body = await request.json()


    // Once we read the body of the request we need to validate it
    // If the data is invalid, we return a 400 error

    if (!body.username)
        return NextResponse.json(
            { error: 'Username is required' },
            { status: 400 })


    // Else we return the data that was created


    return NextResponse.json(
        { id: 1, username: body.username },
        { status: 201 })


    // 201 status is a convention to indicate that something was created
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: number } }) {
       
        // First we should validate the request body
        // If it's invalid, we return a 400 error


        const body = await request.json()
        if (!body.username)
            return NextResponse.json(
                { error: 'Username is required' },
                { status: 400 })
       
        // Fetch the user with the given ID
        // If doesn't exist we return a 404 error


        if (params.id > 10)        
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 })
       
        // Otherwise we update the user
        // Then return the updated user


        return NextResponse.json({ id: 1, username: body.username })
}

export function DELETE(
    request: NextRequest,
    { params }: { params: { id: number } }) {
       
        // Fetch user from db
        // If not found, return 404
       
        if (params.id > 10)
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 })


        // Delete the user
        // Return 200


        return NextResponse.json({})
}
