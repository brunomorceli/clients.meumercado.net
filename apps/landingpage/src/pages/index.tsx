import { useRouter } from 'next/router'
import { Button } from 'rsuite';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <h3>Nearstore</h3>
      <Button onClick={() => router.replace('/entrar')}>Entrar</Button>
    </>
  )
}
