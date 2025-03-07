import { Suspense } from 'react';
import SuccessPage from '../../../components/price/SuccesPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPage />
    </Suspense>
  );
}
