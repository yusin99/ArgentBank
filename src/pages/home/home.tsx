import Features from '../../components/features/features';
import HeroBanner from '../../components/banner/banner';
import './home.module.scss';

function Home() {
  return (
    <main>
      <HeroBanner />
      <Features />
    </main>
  );
}

export default Home;
