import logo from '../../assets/icons/hireflow-logo.svg';

function Logo() {
  return (
    <div className="flex h-7 w-[124px] items-center justify-center overflow-clip">
      <img src={logo} alt="HireFlow" className="h-7 w-[124px]" width="124" height="28" />
    </div>
  );
}

export default Logo;
