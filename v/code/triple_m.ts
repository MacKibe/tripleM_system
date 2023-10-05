// Access the server services by importing all the facilities that are in the
//server module in the schema foler of our library
import * as server from "../../../schema/v/code/server.js";
//
//Access the library needed for saving data to a database from Javascript
import * as quest from "../../../schema/v/code/questionnaire.js";
//
// Access to Page class of our library
import * as view from "../../../outlook/v/code/view.js";
//
// Get the documents to drive our page. A document has the following structure:-
type doc = {
  document: string;
  pages: string;
  title_no: string;
  category: string;
  area: number;
  owner: string;
  regno: string;
};
//
// A page comprises of just a number and the url of the image
type page = { num: string; url: string; name: string };
//
//
type keys = "document" | "title_no" | "category" | "area" | "owner" | "regno";
//
// Extend the page class with our own version, called mashamba
export class triple_m extends view.page {
  //
  // Declare the elements of interests
  //
  // This is the images panel where the documents will be displayed
  public images_section: HTMLElement;
  //
  // This is the panel that represents the transcripts of the documents.
  public transcription_section: HTMLElement;
  //
  // This is the side panel that represents shows the folders of the documents.
  public folder_section: HTMLElement;
  //
  // The couner for documents being displayed
  public counter: number = 0;
  //
  // The results of interrogating the database is an array of documents
  public docs?: Array<doc>;

  //
  // Here we now intialiaze the components we declared
  constructor() {
    super();
    //
    // the image panel
    //
    const images_section = document.getElementById("");
    // the transcript panel
    //
    const transcription_section = document.getElementById(
      "transcription_section"
    );
    //
    // the folder panel
    const folder_section = document.getElementById("folder_section");
    //
    //
  }
  //
  // Replace the show pannels method with our own version
  public async show_panels(): Promise<void> {
    //
    // Load documents
    this.docs = <Array<doc>>(
      await server.exec(
        "database",
        ["mutall_mashamba", false],
        "get_sql_data",
        ["/mashamba/v/code/mashamba.sql", "file"]
      )
    );
    //
    // Load the current title
    this.load_title();
  }
  //
  // Load the current document to the home page depending
  async load_title() {
    //
    // Clear all the 3 panels, viz., first_page, other_pages and transcription
    // this.clear_panels();
    //
    // Get the pages of the given current document number
    const pages: Array<page> = JSON.parse(this.docs![this.counter].pages);
    //
    // Create the first page, including its image
    this.populate_documents(pages[0]);
    //
    // Fill the transcription panel
    for (const key of [
      "document",
      "title_no",
      "category",
      "area",
      "owner",
      "regno",
    ])
      this.fill_transcriptions(<keyof doc>key);
  }
  //
  //clear all the 3 panels
  //   clear_panels() {
  //     //
  //     // Clear the images page
  //     this.images_section.innerHTML = "";
  //     //
  //     // Clear all the inputs of the transcription panel, by looping over all
  //     // the keys of a document, except the pages key
  //     /*
  //         document:string,
  //             pages:string,
  //             title_no:string,
  //             category:string,
  //             area:number,
  //             owner:string,
  //             regno:string
  //         */
  //     for (const key of [
  //       "document",
  //       "title_no",
  //       "category",
  //       "area",
  //       "owner",
  //       "regno",
  //     ]) {
  //       //
  //       // Skip the pages key (because it is a special key)
  //       if (key === "pages") continue;
  //       //
  //       // Get the named element
  //       const element = <HTMLInputElement>document.getElementById(key);
  //       //
  //       // Se its value to empty
  //       element.value = "";
  //     }
  //   }
  populate_documents(page: page) {
    //
    // Create an image element for this page
    const image = document.createElement("img");
    //
    // Set the source of the image to the URL of the page
    image.src = `http://localhost${page[0].url}`;
    //
    // Attach the image element to the other-pages div element
    this.images_section.appendChild(image);
  }
  //
  // Fill the transcriptions, by transferring the values from from the global
  // array, data array to
  // the transciption panel
  fill_transcriptions(key: keyof doc) {
    //
    //Skip the pages key (because it is a special key)
    if (key === "pages") return;
    //
    //Get the named element
    const element = <HTMLInputElement>document.getElementById(key);
    //
    //Get the value that maches the key
    const value = this.docs![this.counter][key];
    //
    //Set the element vale only if the value is not null
    if (value !== null) element.value = String(value);
  }
}
