'use server';

import z from "zod";
import { toInch } from "./utils";

const DPIFormSchema = z.object({
    imageWidth: z.coerce.number().gt(0, { message: 'Image width must be a number greater than 0.' }),
    imageHeight: z.coerce.number().gt(0, { message: 'Image Height must be a number greater than 0.' }),
    printWidth: z.coerce.number().gt(0, { message: 'Print width must be a number greater than 0.' }),
    printHeight: z.coerce.number().gt(0, { message: 'Print height must be a number greater than 0.' }),
    printDimensionsUnit: z.coerce.string().min(1, { message: 'Please select a unit for the print dimensions' }),
});

export type State = {
    errors?: {
        imageWidth?: {
            errors: string[];
        };
        imageHeight?: {
            errors: string[];
        };
        printWidth?: {
            errors: string[];
        };
        printHeight?: {
            errors: string[];
        };
        printDimensionsUnit?: {
            errors: string[];
        };
    };
    widthDPI?: number | null;
    heightDPI?: number | null;
    isReadyToPrint?: boolean | null;
};

export async function calculateDPI(previousState: State, formData: FormData) {
    const validatedFields = DPIFormSchema.safeParse({
        imageWidth: formData.get('imageWidth'),
        imageHeight: formData.get('imageHeight'),
        printWidth: formData.get('printWidth'),
        printHeight: formData.get('printHeight'),
        printDimensionsUnit: formData.get('printDimensionsUnit'),
    });

    if (!validatedFields.success) {
        return {
            errors: z.treeifyError(validatedFields.error).properties,
        };
    }

    const { imageWidth, imageHeight, printWidth, printHeight, printDimensionsUnit } = validatedFields.data;

    const printWidthInInches = toInch(printWidth, printDimensionsUnit);
    const printHeightInInches = toInch(printHeight, printDimensionsUnit);

    const widthDPI = Math.round(imageWidth / printWidthInInches);
    const heightDPI = Math.round(imageHeight / printHeightInInches);

    return {
        widthDPI: widthDPI,
        heightDPI: heightDPI,
        isReadyToPrint: isReadyToPrint(widthDPI, heightDPI),
    };
}

function isReadyToPrint(widthDPI: number, heightDPI: number): boolean {
    if (widthDPI < 150 || heightDPI < 150) {
        return false;
    }

    return true;
}
