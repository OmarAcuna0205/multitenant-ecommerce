"use client";

import { CategoryDropdown } from "./category-dropdown";
import { CustomCategory } from "../types";
import { act, useEffect, useRef } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ListFilterIcon, SidebarOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoriesSidebar } from "./categories-sidebar";

interface Props {
  data: CustomCategory[];
}

export const Categories = ({ data }: Props) => {
  const containerRef =useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(data.length);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Nuevo estado para el botón

  const activeCategory = "all";

  const activeCategoryIndex = data.findIndex((cat) => cat.slug === activeCategory);
  const isActiveCategoryHidden = activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

  useEffect(() => {
    const calculateVisible = () => {
      if(!containerRef.current || !measureRef.current || !viewAllRef.current) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      const ViewAllWidt = viewAllRef.current.offsetWidth;
      const availabeWidth = containerWidth - ViewAllWidt;

      const items = Array.from(measureRef.current.children);
      let totalWidth = 0;
      let visible = 0;
    
      for (const item of items) {
        const width = item.getBoundingClientRect().width;

        if ( totalWidth + width > availabeWidth) break;
        totalWidth += width;
        visible++;
      }

      setVisibleCount(visible);
    };

      const resizeObserver = new ResizeObserver(calculateVisible);
      resizeObserver.observe(containerRef.current!);

      return () => resizeObserver.disconnect();
  }, [data.length]);

  return (
    <div className="relative w-full">

      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} data={data}/>

      <div 
        ref={measureRef}
        className="absolute opacity-0 pointer-events-none flex"
        style= {{ position: "fixed", top:-9999, left: -9999 }}
      >
        {data.map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>

      <div 
        ref={containerRef}
        className="flex flex-nowrap items-center"
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
      >
        {data.slice(0, visibleCount).map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={isAnyHovered}
            />
          </div>
        ))}
      
        <div ref={viewAllRef} className="shrink-0">
          <Button
            variant="elevated"
            className={cn("h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
            isActiveCategoryHidden && !isAnyHovered && "bg-white border-primary",
            (isOpen || isSidebarOpen) && "bg-white border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[4px] -translate-y-[4px]",
        )} 
            onClick={() => { setIsSidebarOpen(true)}}
          >
            View All
            <ListFilterIcon className="ml-2"/>
          </Button>
        </div>
      </div>
    </div>
  );
};
