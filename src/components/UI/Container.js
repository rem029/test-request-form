import '../../styles/container.css';

const Container = (props) => {
  return (
    <div className={'container ' + document.body.classList.value}>
      {props.children}
    </div>
  );
};

export default Container;
