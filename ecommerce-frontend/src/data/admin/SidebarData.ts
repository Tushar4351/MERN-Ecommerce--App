import { IconType } from "react-icons";
import { AiFillFileText } from "react-icons/ai";
import {
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaGamepad,
  FaStopwatch,
} from "react-icons/fa";

import { IoIosPeople } from "react-icons/io";
import {
  RiCoupon3Fill,
  RiDashboardFill,
  RiShoppingBag3Fill,
} from "react-icons/ri";

interface SidebarItem {
    url: string;
    text: string;
    Icon: IconType;
  }
  
  interface SidebarSection {
    title: string;
    items: SidebarItem[];
  }
  
  export const sidebarData: SidebarSection[] = [
    {
      title: 'Dashboard',
      items: [
        {
          url: '/admin/dashboard',
          text: 'Dashboard',
          Icon: RiDashboardFill,
        },
        {
          url: '/admin/product',
          text: 'Product',
          Icon: RiShoppingBag3Fill,
        },
        {
          url: '/admin/customer',
          text: 'Customer',
          Icon: IoIosPeople,
        },
        {
          url: '/admin/transaction',
          text: 'Transaction',
          Icon: AiFillFileText,
        },
      ],
    },
    {
      title: 'Charts',
      items: [
        {
          url: '/admin/chart/bar',
          text: 'Bar',
          Icon: FaChartBar,
        },
        {
          url: '/admin/chart/pie',
          text: 'Pie',
          Icon: FaChartPie,
        },
        {
          url: '/admin/chart/line',
          text: 'Line',
          Icon: FaChartLine,
        },
      ],
    },
    {
      title: 'Apps',
      items: [
        {
          url: '/admin/app/stopwatch',
          text: 'Stopwatch',
          Icon: FaStopwatch,
        },
        {
          url: '/admin/app/coupon',
          text: 'Coupon',
          Icon: RiCoupon3Fill,
        },
        {
          url: '/admin/app/toss',
          text: 'Toss',
          Icon: FaGamepad,
        },
      ],
    },
  ];
  
  interface LiProps {
    url: string;
    text: string;
    location: Location;
    Icon: IconType;
  }