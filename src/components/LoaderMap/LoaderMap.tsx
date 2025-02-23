import { ClipLoader } from "react-spinners";
import './index.css'

export const LoaderMap = () => {
  return(
    <div className="containerLoaderMap">
      <ClipLoader
        loading={true}
        size={60}
        color="#58b046"
      />
      <h2>Loading map...</h2>
    </div>
  )
};