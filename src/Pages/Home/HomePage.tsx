import { useNavigate } from "react-router-dom";
import { CreateMapBtn } from "../../components/CreateMapBtn/CreateMapBtn";

export const HomePage = () => {
  const navigate = useNavigate();

  const onClickCreateMap = () => {
    navigate("/createFarm");
  };

  return (
    <>
      <h2>Smart Harvest</h2>
      <CreateMapBtn onClickCreateMap={onClickCreateMap} />
    </>
  );
};