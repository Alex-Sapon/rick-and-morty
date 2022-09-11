import React from 'react';

type PaginationPropsType = {
    postsPerPage: number
    totalPosts: number
    paginateFront: () => void
    paginateBack: () => void
    currentPage: number
}

export const Pagination = (props: PaginationPropsType) => {
    const {postsPerPage, totalPosts, paginateFront, paginateBack, currentPage} = props;

    return (
        <div className="py-6 flex items-center justify-center">
            <div>
                <p className="text-sm text-gray-700">
                    Showing
                    <span className="font-medium mx-2">{currentPage * postsPerPage - 10}</span>
                    to
                    <span className="font-medium mx-2">{currentPage * postsPerPage}</span>
                    of
                    <span className="font-medium mx-2">{totalPosts}</span>
                    results
                </p>
            </div>
            <nav className="block"/>
            <div className="ml-5">
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <span
                        onClick={paginateBack}
                        className="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                        <span>Previous</span>
                    </span>

                    <span
                        onClick={paginateFront}
                        className="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                        <span>Next</span>
                    </span>
                </nav>
            </div>
        </div>
    );
}