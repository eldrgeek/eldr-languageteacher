import { CurrentModule, React, useApp } from '../CurrentModule';
const Title = () => {
  const { state, actions } = useApp();

  return (
    <React.Fragment>
      <h1>The Template</h1>
    </React.Fragment>
  );
};

export default Title;
CurrentModule(Title);
