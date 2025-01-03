import { goToSection } from './../helpers/goToSection';
import { sectionIds, sectionType } from './../consts/sectionIds';
import { useCallback, useEffect, useState } from "react";
import _debounce from 'lodash/debounce';

export const useHomePageSections = () => {
    const [currentSection,setCurrentSection] = useState<sectionType>(sectionIds.start);
    const [sideNavShown,setSideNavShown] = useState<"shown" | "hidden">("shown");
    const onChangeSection = (section:sectionType) => {
        setCurrentSection(section);
        goToSection(section.scrollTo);
    };

    const handleScroll = () => {
        const distanceFromTop = window.scrollY;
        const sections = Object.values(sectionIds);

        const newSideNavState = distanceFromTop >= sectionIds.about.distanceBottom - 220 ? 'hidden' : 'shown';
        setSideNavShown(newSideNavState);

        for(let i = 0;i < sections.length;i++){
            if(sections[i].distanceTop <= distanceFromTop && sections[i].distanceBottom >= distanceFromTop){
                setCurrentSection(sections[i]);
                return;
            }
        }
    }
    const debounceHandleScroll = useCallback(_debounce(handleScroll, 100), []);

    useEffect(() => {
        window.addEventListener('scroll',debounceHandleScroll);
    },[]);

    return {currentSection,onChangeSection,sideNavShown};
}