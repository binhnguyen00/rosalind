import { Basics } from "@schemas";
import { useResumeStore } from "@stores";

export default function Default() {
  const resume = useResumeStore(state => state.resume);

  return (
    <div>
      <p> {resume.basics.name} </p>
      <p> {resume.basics.email} </p>
      <p> {resume.basics.phone} </p>
      <p> {resume.basics.location} </p>
    </div>
  )
}