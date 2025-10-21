import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../types/error';
declare const handleValidationError: (err: mongoose.Error.ValidationError) => TGenericErrorResponse;
export default handleValidationError;
//# sourceMappingURL=validationError.d.ts.map