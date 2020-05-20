import { StTableHeader } from '../';


export interface StDynamicTableHeader extends StTableHeader {
   reference: string;
   fk?: StDynamicTableFk;
   group?: string;
}

export interface StDynamicTableFkEvent {
   fk?: StDynamicTableFk;
   value: string | number;
}

export interface StDynamicTableUISpecification {
   sortable?: boolean;
   styles?: {
      [key: string]: string;
   };
   fk?: StDynamicTableFk;
   group_field?: {
      name: string;
   };
   templateRef?: string;
}


export interface StDynamicTableUserInterface {
   [key: string]: StDynamicTableUISpecification;
}

export interface StDynamicTableFk {
   table: string;
   field: string;
}
