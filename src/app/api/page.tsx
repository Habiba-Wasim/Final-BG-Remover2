import RemoveBgComponent from '@/components/RemoveBgComponent';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-center text-2xl font-bold">Background Remover</h1>
      <RemoveBgComponent />
    </div>
  );
}
