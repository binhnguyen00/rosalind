import { Basics } from "@schema";
import { useResumeStore } from "@stores";

export default function Default() {
  const resume = useResumeStore(state => state.resume);

  const renderSection = () => {
    switch (true) {
      case true:

        break;

      default:
        break;
    }
  }

  return (
    <div>

    </div>
  )
}