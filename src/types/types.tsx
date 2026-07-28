
import { ReactNode } from "react";
import { enDays } from "../components/constants/enum";
import dayjs, { Dayjs } from 'dayjs';

export interface FoodInfoDto {
    name: string;
    price: string;
    description: string;
    id:number;
    isOrderingEnabled:boolean;
    image: string; // Assuming the image is a base64 string. Adjust the type if it's different.
  }
  
  export interface FoodCategoryProps {
    category: string;
    foodList: FoodInfoDto[];
  }
  
  export  interface FoodCardProps {
    name: string;
    price: string;
    description: string;
    id:number;
    isOrderingEnabled:boolean;
    image: string; // Assuming the image is a base64 string. Adjust the type if it's different.
  }
  export interface DaySelectorProps {
    selectedDay: enDays;
    setSelectedDay: (day: enDays) => void;
  }
  export interface FoodCategoryProps {
    category: string;
  }
  
  export interface FoodCategoryData {
    foodList: FoodInfoDto[];
    categoryName: string;
    inDayOrder: number;
  }
 export interface CustomModalProps {
    isOpen: boolean;
    title?: string;
    message?: string;
    okButtonText?: string;
    okButtonClick?: () => void;
    leftButtonText?: string;
    leftButtonClick?: () => void;
    rightButtonText?: string;
    rightButtonClick?: () => void;
    children? :ReactNode;
  }
  export interface AppContextType {
    loading: boolean;
    startLoading: () => void;
    stopLoading: () => void;
    setModal1State: (modalProps: Omit<CustomModalProps, 'onClose'>) => void; // Method to set modal state
    setModal2State: (modalProps: Omit<CustomModalProps, 'onClose'>) => void; // Method to set modal state
    refreshNavbar:() => void;
    navbarProps:NavbarProps;
    setIsLoggedIn:(param:boolean)=>void;
    isLoggedIn:boolean;
    globalCss:globalCss
  };
  export interface globalCss{
componentBackgroundColor:string
  }
  export interface NavbarProps {
   itemCount:number
  };

  // CartItemDetailDto interface
export interface CartItemDetailDto {
    foodId: number;            // long in .NET corresponds to number in TypeScript
    foodName: string;
    foodDescription: string;
    image: Uint8Array;         // byte[] in .NET corresponds to Uint8Array in TypeScript
    quantity: number;
    unitPrice: number;         // decimal in .NET corresponds to number in TypeScript
  }
  
  // CartDto interface
  export interface CartDto {
    cartItemDetailDtoList: CartItemDetailDto[];   // IEnumerable in .NET corresponds to array in TypeScript
    message: string;
  }
  export interface FilteredOrder {
    orderId: number;
    statusName: string;
    address: string;
    totalPrice: number;
    deliveryDate: Date;
    orderDate: Date;
  }
  export interface FilterOrderParam {
    pageNumber?: number| string;
    pageSize?: number| string;
    orderId: number | string;
    orderDateStart?: Dayjs | null;
    orderDateEnd?: Dayjs| null;
    statusId?: number| string;
    deliveryDateStart?: Dayjs | null;
    deliveryDateEnd?: Dayjs| null;
    priceStart?: number| string;
    priceEnd?: number| string;
    address?: string| string;
  }

  export interface OrderDetail {
    orderNo: string;
    totalPrice: number;
    address: string;
    orderDate: string;
    deliveryDate: string;
    statusId: string;
  }
export 
interface UpdateOrderProps {
  orderId: number;
  filterOrders:()=>void;
}
  export interface StatusLov{

    id:number,
    name:string
  }


  export enum UserRole {
    Admin = 1,
    StandartUser = 0,
  }