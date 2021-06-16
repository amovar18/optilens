import React from 'react';
export default function Showprescription(props){
	return (
		<div className='table-responsive'>
			<table className='table'>
				<thead>
					<tr>
						<th>Eye</th>
						<th>Sign</th>
						<th>SPH.</th>
						<th>CYL.</th>
						<th>AXIS</th>
						<th>ADD</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>RE(OD)</td>
						<td>{props.lens.rsign}</td>
						<td>{props.lens.resph}</td>
						<td>{props.lens.recyl}</td>
						<td>{props.lens.reax}</td>
						<td>{props.lens.readd}</td>
					</tr>
					<tr>
						<td>LE(OS)</td>
						<td>{props.lens.lsign}</td>
						<td>{props.lens.lesph}</td>
						<td>{props.lens.lecyl}</td>
						<td>{props.lens.leax}</td>
						<td>{props.lens.leadd}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
