import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../types/error';
declare const handleCastError: (err: mongoose.Error.CastError) => TGenericErrorResponse;
export default handleCastError;
//# sourceMappingURL=castError.d.ts.map