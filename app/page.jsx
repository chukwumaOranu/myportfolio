import { redirect } from 'next/navigation';
import './services/apiInterceptor';

export default function Home() {
  redirect('/main/home');
}