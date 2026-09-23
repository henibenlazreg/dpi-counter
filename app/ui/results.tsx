'use client';

import { State } from '../lib/actions';

export default function Results({ state }: { state: State }) {
    return (
        <div className="flex-1 flex flex-col gap-4 shadow-md max-w-3xl rounded-lg px-5 py-10 bg-white dark:bg-black">
            {
                (state.widthDPI && state.heightDPI) &&
                <div className='w-full p-4 bg-green-500 rounded-md text-olive-50 font-bold'>
                    <p>Horizental DPI : {state.widthDPI}</p>
                    <p>Vertical DPI : {state.heightDPI}</p>
                </div>
            }

            {
                (state.isReadyToPrint === true) &&
                <div className='w-full p-4 bg-green-500 rounded-md text-olive-50 font-bold'>
                    <p>Ready to print</p>
                </div>
            }
            {
                (state.isReadyToPrint === false) &&
                <div className='w-full p-4 bg-red-500 rounded-md text-olive-50 font-bold'>
                    <p>Not ready to print</p>
                </div>
            }
        </div>
    );
}
