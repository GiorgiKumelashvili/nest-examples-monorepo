import { ExceptionMessageCode } from '../../api/utils/exception_message_code.enum';
import { GenericException } from '../../api/utils/generic.exception';
import { GenHelper } from '../../shared/general.helpers';
import { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export class LolInterceptor {
  config: InternalAxiosRequestConfig;
  code?: string;
  request?: any;
  response?: AxiosResponse<any>;
  isAxiosError: boolean;
  toJSON: () => object;
  name: string;
  message: string;
  stack?: string;

  // register headers for lol api
  onRequest(config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> {
    config.timeout = 10000; // 10 sec
    config.headers[GenHelper.LOL_HEADER] = GenHelper.LOL_KEY;

    // for some reason axiosfit has problem with base path not given
    config.url = config.url.replace('undefined/', '');

    return config;
  }

  onResponse(response: AxiosResponse<any>): AxiosResponse<any> | Promise<AxiosResponse<any>> {
    return response.data;
  }

  // needed catches exceptions
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onError?(_error: AxiosError) {
    // console.log(_error);
    if (_error.isAxiosError) {
      throw new GenericException(
        _error?.response?.status,
        ExceptionMessageCode.API_ERROR_SOMETHING_WENT_WRONG,
        _error.message,
        _error?.response?.statusText,
      );
    }

    throw new GenericException(HttpStatus.INTERNAL_SERVER_ERROR, ExceptionMessageCode.INTERNAL_SERVER_ERROR);
  }
}
// export class LolInterceptor implements AxiosfitRequestInterceptor, AxiosfitResponseInterceptor, AxiosError {
//   config: InternalAxiosRequestConfig;
//   code?: string;
//   request?: any;
//   response?: AxiosResponse<any>;
//   isAxiosError: boolean;
//   toJSON: () => object;
//   name: string;
//   message: string;
//   stack?: string;

//   // register headers for lol api
//   onRequest(config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> {
//     config.timeout = 10000; // 10 sec
//     config.headers[GenHelper.LOL_HEADER] = GenHelper.LOL_KEY;

//     // for some reason axiosfit has problem with base path not given
//     config.url = config.url.replace('undefined/', '');

//     return config;
//   }

//   onResponse(response: AxiosResponse<any>): AxiosResponse<any> | Promise<AxiosResponse<any>> {
//     return response.data;
//   }

//   // needed catches exceptions
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   onError?(_error: AxiosError) {
//     // console.log(_error);
//     if (_error.isAxiosError) {
//       throw new GenericException(
//         _error?.response?.status,
//         ExceptionMessageCode.API_ERROR_SOMETHING_WENT_WRONG,
//         _error.message,
//         _error?.response?.statusText,
//       );
//     }

//     throw new GenericException(HttpStatus.INTERNAL_SERVER_ERROR, ExceptionMessageCode.INTERNAL_SERVER_ERROR);
//   }
// }
