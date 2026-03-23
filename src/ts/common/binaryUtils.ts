import { BinaryWriter, getWriterBuffer, createBinaryWriter, resizeWriter } from 'ag-sockets/dist/browser';
import { isDataViewError } from './utils';

export function writeBinary(write: (writer: BinaryWriter) => void): Uint8Array {
	const writer = createBinaryWriter();

	do {
		try {
			write(writer);
			break;
		} catch (e) {
			if (e instanceof RangeError || isDataViewError(e)) {
				resizeWriter(writer);
			} else {
				throw e;
			}
		}
	} while (true);

	return getWriterBuffer(writer);
}
