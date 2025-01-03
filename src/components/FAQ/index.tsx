import { Collapse, CollapseProps, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { CSSProperties, useEffect } from "react";
import { useFaq } from "../../hooks/faq";
import { useThemeStore } from "../../store/themeStore";
import { Loader } from "../Loader/Loader";
import "./faqStyles.scss";

export const FAQ = () => {
    const theme = useThemeStore().theme;
    const {faqItems,loading} = useFaq();
    useEffect(() => {
      document.title = "Часті питання"
    },[]);
    const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => 
    faqItems.length ?
      faqItems.map(faq => ({
        key:faq.question,
        label:faq.question,
        children:<p>{faq.answer}</p>,
        style: panelStyle
      }))
    : [
        {
          key: '1',
          label: 'Питання від тестувальника номер 1',
          children: <p>Відповідь від тестувальника на потенційне питання користувача номер 1</p>,
          style: panelStyle,
        },
        {
          key: '2',
          label: 'Питання від тестувальника номер 2',
        children: <p>Відповідь від тестувальника на потенційне питання користувача номер 2</p>,
          style: panelStyle,
        },
        {
          key: '3',
          label: 'Питання від тестувальника номер 3',
          children: <p>Відповідь від тестувальника на потенційне питання користувача номер 3</p>,
          style: panelStyle,
        },
        {
            key: '4',
            label: 'Питання від тестувальника номер 4',
            children: <p>Відповідь від тестувальника на потенційне питання користувача номер 4</p>,
            style: panelStyle,
          },
          {
            key: '5',
            label: 'Питання від тестувальника номер 5',
            children: <p>Відповідь від тестувальника на потенційне питання користувача номер 5</p>,
            style: panelStyle,
          },
          {
            key: '6',
            label: 'Питання від тестувальника номер 6',
            children: <p>Відповідь від тестувальника на потенційне питання користувача номер 6</p>,
            style: panelStyle,
          },
          {
            key: '7',
            label: 'Питання від тестувальника номер 7',
            children: <p>Відповідь від тестувальника на потенційне питання користувача номер 7</p>,
            style: panelStyle,
          },
      ];
      const panelStyle: React.CSSProperties = theme === 'dark' ? {
        marginBottom: 20,
        background: 'var(--secondary-blue)',
        borderRadius: '10px 5px',
        border: 'none',
      } :  {
        marginBottom: 20,
        background: 'var(--secondary-blue)',
        borderRadius: '10px 5px',
        border: 'none',
        color:'black'
      };
    return <main className={`faqMain__container ${theme}`}>
        <h1 className="faqTitle">Питання до сайту які можуть виникнути</h1>
        {!loading ? <section className="faqQuestions__container">
            <Collapse className="faqCollapse"
                items={getItems(panelStyle)}
            /> 
        </section> : <Loader/>}
        <div className="faqForm">
            <h1 className="faqTitle">Не має вашого питання?</h1>
            <TextArea className="faqQuestionTextArea" autoSize={true} rows={10} placeholder={'Запиши сюди своє питання до адміністрації сайту.'}/>
            <input type={'submit'} value={'Надіслати'} className={'faqSubmit primary_button'}/>
        </div>
    </main>
}