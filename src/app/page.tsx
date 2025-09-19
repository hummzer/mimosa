import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Momo</h1>
      <Link href="/signin">Sign In</Link>
    </div>
  );
}
