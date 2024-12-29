import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Error() {
  const path = usePathname
  useEffect(() => {
    console.log('paht', path)
  },[])
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <h1>Error Occurred</h1>
    </div>
  );
}
