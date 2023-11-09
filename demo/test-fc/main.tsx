import ReactDOM from 'react-dom';

import { useState } from 'react';

function App() {
	const [num] = useState(100);
	return <div>{num}</div>;
}
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<App />
);
