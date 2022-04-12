/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-node-access */
import React from "react";
import { cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ULLinks, { testID } from "./ULLinks";
import { FaHome, FaYoutube } from "react-icons/fa";
import { before, Query } from "../../utils/testHelper";

describe("<ULLinks />", () => {
  const ulClassName = "unordered-list";
  const aClassName = "anchor";

  const liClassName = "list-item";

  const ullinks = (
    <ULLinks
      aClassName={aClassName}
      ulClassName={ulClassName}
      liClassName={liClassName}
      listOfItems={[
        {
          url: "http://google.com",
          icon: <FaHome />,
          tag: "google",
        },
        {
          url: "https://youtube.com",
          icon: <FaYoutube className="youtube" />,
          tag: "google",
        },
        {
          cb: (item, aClassName) => (
            <a className={`${aClassName} blue`} href={item.url}>
              <span> {item.tag}</span>
              {item.icon}
            </a>
          ),
          url: "http://localhost:3000",
          icon: <FaHome />,
          tag: "google",
        },
      ]}
    />
  );

  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before("ULLinks", ullinks));
  });

  afterAll(() => {
    cleanup();
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });

  it("mounts a ul", () => {
    expect(element.tagName).toMatch("UL");
  });

  it("should has 3 children", () => {
    const youtUbeElement = query(".youtube");
    const blueElement = query(".blue");
    expect(element.children.length).toBe(3);
    expect(youtUbeElement).toBeInTheDocument();
    expect(blueElement).toBeInTheDocument();
  });

  it("should use given aClassName for anchor tags", () => {
    const anchor = query(`.${aClassName}`);
    expect(anchor?.tagName).toBe("A");
  });

  it("should use given ulClassName for unordered list element", () => {
    expect(element.className).toMatch(ulClassName);
  });

  it("should use given liClassName for list item elements", () => {
    const li = query(`.${liClassName}`);
    expect(li?.tagName).toBe("LI");
  });

  it("should return and empty UL if listOfItems is empty", () => {
    ({ element } = before(testID, <ULLinks listOfItems={[]} />));
    expect(element.children.length).toBe(0);
  });

  it.skip("should has a plus svg which it had children", () => {
    ({ element, query } = before(
      testID,
      <ULLinks
        listOfItems={[
          {
            tag: "amirhossein",
            url: "http://somewhere.com",
            icon: <FaHome />,
            children: [
              {
                tag: "Cyrus",
                url: "http://somewhere.com",
                icon: <FaHome />,
              },
            ],
          },
        ]}
      />
    ));
    const li = element.children[0];
    expect(li.children.length).toBe(2);
  });

  it.skip("'s child icon should get the given className", () => {
    ({ element } = before(
      testID,
      <ULLinks
        plusMinesClassName="test"
        listOfItems={[
          {
            tag: "amirhossein",
            url: "http://somewhere.com",
            icon: <FaHome />,
            children: [
              {
                tag: "Cyrus",
                url: "http://somewhere.com",
                icon: <FaHome />,
              },
            ],
          },
        ]}
      />
    ));
    const li = element.children[0];
    expect(li.children[1].classList[1]).toMatch("test");
  });

  // it("should change the plus icon to minus icon after click event", () => {
  //   cleanup();
  //   render(
  //     <ULLinks
  //       plusMinesClassName="test"
  //       listOfItems={[
  //         {
  //           tag: "amirhossein",
  //           url: "http://somewhere.com",
  //           icon: <FaHome />,
  //           children: [
  //             {
  //               tag: "Cyrus",
  //               url: "http://somewhere.com",
  //               icon: <FaHome />,
  //             },
  //           ],
  //         },
  //       ]}
  //     />
  //   );
  //   ullinks = screen.getByTestId(testID);
  //   const li = ullinks.children[0];
  //   const plus = li.children[1];

  //   fireEvent(
  //     plus,
  //     new MouseEvent("click", {
  //       bubbles: true,
  //       cancelable: true,
  //     })
  //   );

  //   expect(li.children[1].classList[0]).toBe("minus");
  // });
});
