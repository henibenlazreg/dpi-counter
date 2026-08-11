'use client';

import { calculateDPI, State } from './lib/actions';
import { useActionState, useState } from 'react';
import ImageUploadUI from './ui/file-upload';
import { Input, InputErrorMessage } from './ui/input';
import { PrinterIcon, CalculatorIcon, LightBulbIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const initialState: State = {};
  const [state, formAction] = useActionState(calculateDPI, initialState);
  const [imageWidth, setImageWidth] = useState('');
  const [imageHeight, setImageHeight] = useState('');
  const [printWidth, setPrintWidth] = useState('');
  const [printHeight, setPrintHeight] = useState('');
  const [printDimensionsUnit, setPrintDimensionsUnit] = useState('mm');

  const handleUpload = (file: File) => {
    if (!file) return;

    const image = new Image();
    image.src = URL.createObjectURL(file);

    image.onload = () => {
      setImageWidth(String(image.width));
      setImageHeight(String(image.height));
    };
  };

  return (
    <div className="flex flex-col flex-1 justify-center bg-zinc-50 p-6 font-sans dark:bg-black">
      <main className="flex gap-6 shadow-md max-w-3xl flex-col rounded-lg px-5 py-10 bg-white dark:bg-black">
        {/* Title */}
        <div className='flex gap-4'>
          <PrinterIcon className='size-10 block rounded-md p-1 bg-blue-500 stroke-white' />
          <h1 className="text-3xl font-semibold tracking-wide text-black dark:text-zinc-50">
            DPI calculator
          </h1>
        </div>

        {/* Form */}
        <form action={formAction} className="flex flex-col gap-4 w-full">

          {/* Image dimensions section */}
          <div className='flex flex-col gap-4 rounded-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-5 border-gray-400 border-2'>
            <div className='flex items-center gap-2 mb-2'>
              <span className='flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white'>1</span>
              <span className='text-sm font-semibold'>Image dimensions (px)</span>
            </div>
            <ImageUploadUI callback={handleUpload} />
            <div className="flex w-full gap-2">
              <div className="flex-1">
                <Input
                  name="imageWidth"
                  describedBy="image-width-error"
                  value={imageWidth}
                  onChangeCallback={setImageWidth}
                  label="Width in pixels"
                  placeholder="Enter width..."
                />

                <InputErrorMessage id="image-width-error" errorsProperty={state.errors?.imageWidth} />
              </div>
              <div className="flex-1">
                <Input
                  name="imageHeight"
                  describedBy="image-height-error"
                  value={imageHeight}
                  onChangeCallback={setImageHeight}
                  label="Height in pixels"
                  placeholder="Enter height..."
                />
                <InputErrorMessage id="image-height-error" errorsProperty={state.errors?.imageHeight} />
              </div>
            </div>
            <div className='flex gap-2 items-center'>
              <LightBulbIcon className='size-4 stroke-zinc-500' />
              <span className='text-sm text-zinc-500'>Or enter the image dimensions manually</span>
            </div>
          </div>

          {/* Print dimensions section */}
          <div className='flex flex-col gap-4 rounded-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-5 border-gray-400 border-2'>
            <div className='flex items-center gap-2 mb-2'>
              <span className='flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white'>2</span>
              <span className='text-sm font-semibold'>Print dimensions</span>
            </div>
            <div className="flex w-full gap-2">
              <div className="flex-1">
                <Input
                  name="printWidth"
                  step="0.1"
                  describedBy="print-width-error"
                  value={printWidth}
                  onChangeCallback={setPrintWidth}
                  label="Print width"
                  placeholder="Enter width..."
                />
                <InputErrorMessage id="print-width-error" errorsProperty={state.errors?.printWidth} />
              </div>
              <div className="flex-1">
                <Input
                  name="printHeight"
                  step="0.1"
                  describedBy="print-height-error"
                  value={printHeight}
                  onChangeCallback={setPrintHeight}
                  label="Print height"
                  placeholder="Enter height..."
                />
                <InputErrorMessage id="print-height-error" errorsProperty={state.errors?.printHeight} />
              </div>

              <div className="self-start rounded-xl border border-zinc-100 bg-white px-4 py-3
              text-sm text-zinc-900 placeholder:text-zinc-400 shadow-[0_1px_3px_rgba(15,23,42,0.08)]
              outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                <label htmlFor="printDimensionsUnit" className="mb-1 block text-xs font-medium text-black-500">Unit</label>
                <select
                  id="printDimensionsUnit"
                  name="printDimensionsUnit"
                  className="w-full bg-transparent outline-none"
                  aria-describedby='measurement-unit-error'
                  value={printDimensionsUnit}
                  onChange={(e) => {
                    setPrintDimensionsUnit(e.target.value);
                  }}
                >
                  <option key="mm" value="mm">mm</option>
                  <option key="cm" value="cm">cm</option>
                  <option key="m" value="m">m</option>
                  <option key="in" value="in">in</option>
                  <option key="ft" value="ft">ft</option>
                  <option key="yd" value="yd">yd</option>
                </select>
              </div>
              <InputErrorMessage id="measurement-unit-error" errorsProperty={state.errors?.printDimensionsUnit} />
            </div>
            <div className='flex gap-2 items-center'>
              <InformationCircleIcon className='size-4 stroke-zinc-500' />
              <span className='text-sm text-zinc-500'>These are the dimensions of the printed output</span>
            </div>
          </div>

          <button
            className='flex gap-2 self-start rounded-lg bg-blue-500 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600'
          >
            <CalculatorIcon className='size-5' />
            Calculate
          </button>
        </form>

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
      </main>
    </div>
  );
}
