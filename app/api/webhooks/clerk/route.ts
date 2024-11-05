import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'

export async function POST(req: Request) {

  //Adding the WebHook secret to engage communication//
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Getting the headers //
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out //
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Getting the body //
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Creating a new Svix instance with WebHook secret //
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verifying the payload with the headers //
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  /////////////////////////////// Using the payload to communicate with the server through the provided endpoints starts /////////////////////////////
  const { id } = evt.data
  const eventType = evt.type

  // Instance where user is created with clerk Auth //
  if (eventType === 'user.created'){
    const {id, email_addresses, first_name, last_name, username} = evt.data

    const user = {
        userId: id,
        email: email_addresses[0]?.email_address || 'No email provided',
        firstName: first_name || 'No first name',
        lastName: last_name || 'No last name',
        username: username,
    }
    console.log("User data", user)

    try {
        const response = await fetch('http://localhost:5001/saveUserData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user }),
        });
    
        if (!response.ok) {
          throw new Error('Failed to create user');
        }
    
        const data = await response.json(); // Awaiting server/backend JSON resonce
        console.log(data) ; 
      } catch (error) {
        console.error('Error creating user:', error);
        return null; // Return null in case of failure
      }
  // Instance where user is deleted with clerk Auth //
  } else if (eventType === 'user.deleted') {
    const { id } = evt.data

    try {
      const response = await fetch(`http://localhost:5001/deleteUser/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete user')
      }

      console.log(`User with ID ${id} deleted successfully`)
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  

  return new Response('', { status: 200 })
}
  console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
  console.log('Webhook body:', body)

  return new Response('', { status: 200 })
}