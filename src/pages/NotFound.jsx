import PageShell from '../components/PageShell'
import { navStore } from '../store/navStore'

export default function NotFound() {
  return (
    <PageShell title='Lost' accent='#e2574c'>
      <section className='mx-auto flex max-w-3xl flex-col items-center px-5 text-center md:px-10'>
        <p className='font-display text-8xl font-bold text-sunset-500 md:text-9xl'>404</p>
        <h1 className='huge mt-4 text-3xl md:text-5xl'>YOU WANDERED OFF THE ISLAND</h1>
        <p className='mt-6 font-body text-lg font-semibold text-plum-700/80'>
          This path doesn&apos;t exist in the world yet. Let&apos;s get you back to solid ground.
        </p>
        <button onClick={() => navStore.go('/', '#f97316')} className='btn-primary mt-10' data-cursor='HOME'>
          ← Return to the world
        </button>
      </section>
    </PageShell>
  )
}