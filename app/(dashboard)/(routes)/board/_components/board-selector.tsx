import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import React from 'react';

interface BoardSelectorProps {
    options: { label: string; value: string; } [];
    value?: string;
    onChange: (value: string) => void;
}

export const BoardSelector = ({
                                  options,
                                  value,
                                  onChange,
                              }: BoardSelectorProps) => {
    const handleTabChange = (tabValue: string) => {
        onChange(tabValue);
    };

    // 게시판 종류에 따라서 조정 되는 tablist 개수
    const numCols = options.length >= 4 ? 4 : 3;

    return (
        <Tabs value={value} onValueChange={handleTabChange}>
            <TabsList className='flex w-full'>
                {options.map((option) => (
                    <TabsTrigger
                        key={option.value}
                        value={option.value}
                        className={`rounded-sm ${numCols === 4 ? 'w-1/4' : 'w-1/3'}`}
                    >
                        {option.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            {/*<TabsList className={`grid w-full grid-cols-3`}>
                {options.map((option) => (
                    <TabsTrigger
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </TabsTrigger>
                ))}
            </TabsList>*/}
        </Tabs>
    )
}