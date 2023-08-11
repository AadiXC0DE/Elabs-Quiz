import Image from 'next/image'
import axios from 'axios'

const uri = "http://localhost:3000/api/v1/quiz"

export default function Home() {
  return (
	  <>
	  	<form action={`${uri}/login`} method="post">
  <label for="roll">Roll Number</label>
  <input
    type="text"
    id="roll"
    name="roll"
    required
    minlength="10"
    maxlength="20"
  />
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required />
  <button type="submit">Submit</button>
</form>
	  </>
  )
}
