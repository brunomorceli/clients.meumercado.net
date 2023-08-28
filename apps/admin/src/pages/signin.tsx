import { Signin } from "@/components/Signin";

export default function NotFound() {
  console.log('------------------',window.location.host.split('.')[0]);
  return <Signin />;
}