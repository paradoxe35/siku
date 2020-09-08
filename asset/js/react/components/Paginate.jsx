import React from 'react'

export const Paginate = ({ pagination = {}, onChange }) => {
    const prev = pagination.prev;
    const next = pagination.next;
    const content = <nav aria-label="Page navigation" className="mt-3">
        <ul className="pagination justify-content-start">
            <li className={`page-item ${prev ? 'active' : ''}`}>
                <button disabled={!prev} className={`page-link ${!prev ? 'disabled' : ''} btn-sm`}
                    rel="prev" onClick={() => onChange(prev)} aria-label="« Précédent">
                    <i className="ni ni-bold-left"></i>
                    <span className="sr-only">Previous</span>
                </button>
            </li>
            <li className={`page-item ${next ? 'active' : ''}`}>
                <button disabled={!next} className={`page-link ${!next ? 'disabled' : ''} btn-sm`}
                    rel="next" onClick={() => onChange(next)} aria-label="Suivant »">
                    <i className="ni ni-bold-right"></i>
                    <span className="sr-only">Next</span>
                </button>
            </li>
        </ul>
    </nav>
    return <>{pagination && (prev || next) && content}</>
}