'use client';

import { calculateDPI, State } from './lib/actions';
import { useActionState } from 'react';
import CalculationForm from './ui/calculation-form';
import Results from './ui/results';

export default function Home() {
  const initialState: State = {};
  const [state, formAction] = useActionState(calculateDPI, initialState);

  return (
    <div className="flex gap-6 flex-1 justify-center bg-zinc-50 p-6 font-sans dark:bg-black">
        <CalculationForm state={state} formAction={formAction} />
        <Results state={state} />
    </div>
  );
}
