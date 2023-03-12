export interface ModalInnerContent {
    getHeader() : string;
    getSources?() : string;
    setProps?(props : any) : void;
}