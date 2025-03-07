import Canceled from '@/components/modal/modaleType/Canceled';
import CopyLink from '@/components/modal/modaleType/CopyLink';
import CreateFolder from '@/components/modal/modaleType/CreateFolder';
import DeleteFile from '@/components/modal/modaleType/DeleteFile';
import Information from '@/components/modal/modaleType/Information';
import PayementResult from '@/components/modal/modaleType/PayementResult';
import RemovePayement from '@/components/modal/modaleType/RemovePayement';
import UpdateProfile from '@/components/modal/modaleType/UpdateProfile';
import UploadFile from '@/components/modal/modaleType/UploadFile';
import UploadLoader from '@/components/modal/modaleType/UploadLoader';

/**
 * Map of modal components for different actions
 * @constant
 * @type {Object}
 */

export const modalsMap = {
  Information,
  CreateFolder,
  UploadFile,
  UploadLoader,
  DeleteFile,
  CopyLink,
  UpdateProfile,
  PayementResult,
  RemovePayement,
  Canceled,
};
