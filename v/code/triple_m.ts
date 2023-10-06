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
type page = {
  num: string;
  url: string;
  name: string;
};
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
  //The couner for documents being displayed
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
    this.images_section = document.getElementById("images_section")!;
    // the transcript panel
    //
    this.transcription_section = document.getElementById(
      "transcription_section"
    )!;
    //
    // the folder panel
    this.folder_section = document.getElementById("folder_section")!;
    //
    //
  }
  //
  // Replace the show pannels method with our own version
  public async show_panels(): Promise<void> {
    //
    // Load documents
    this.docs = (
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
  // Load documents to the home page depending
  async load_title() {
    //
    // Get the pages of the given current document number
    const pages:Array<document: string,pages: string,title_no: string,category: string,area: number,owner: string,regno: string>= JSON.parse(this.docs);
    //
    // Create the first page, including its image
    pages.forEach((page) => {
      // Create an image element for this page
      const image = document.createElement("img");
      //
      // Set the source of the image to the URL of the page
      image.src = `http://localhost${page.url}`;
      //
      // Attach the image element to the other-pages div element
      this.images_section.appendChild(image);
    });
  }
}
