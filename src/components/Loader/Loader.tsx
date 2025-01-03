import { Spin } from "antd"
import { createPortal } from 'react-dom';

export const Loader = () => {
    return <div style={{width:'100vw',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}><Spin/></div>
}