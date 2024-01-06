import { Observable } from 'rxjs';
export interface ModalInnerContent {
    getHeader() : string;
    getSources?() : string;
    setProps?(props : any, okFunction? : {function: (props?:any)=>void,props: any}[]) : void;
    getObservable?() : Observable<any>;
    handleObservableData?(data:any) : void;
}