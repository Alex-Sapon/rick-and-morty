import React from 'react';

type PaginationPropsType = {
    page: number
    postsPerPage: number
    totalPosts: number
    paginateFront: () => void
    paginateBack: () => void
}

export const Pagination = (props: PaginationPropsType) => {
    const {postsPerPage, totalPosts, paginateFront, paginateBack, page} = props;

    const totalPage = Math.ceil(totalPosts / postsPerPage);

    return (
        <div className="py-6 flex items-center justify-center">
            <div className="flex items-center justify-center">
                <p className="text-sm text-gray-700">
                    Page
                    <span className="font-medium mx-2">{page}</span>
                </p>
                <p className="text-sm text-gray-700">
                    of
                    <span className="font-medium mx-2">{totalPage}</span>
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