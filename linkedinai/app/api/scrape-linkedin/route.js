import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { PortfolioAgent } from "../../utils/langchainAgent";

export async function POST(request) {
  try {
    const { url } = await request.json();

    // Validate LinkedIn URL
    if (!url.includes("linkedin.com/in/")) {
      return NextResponse.json(
        { error: "Invalid LinkedIn URL" },
        { status: 400 }
      );
    }

    // Scrape LinkedIn data
    const rawProfileData = await scrapeLinkedInProfile(url);

    // Process with Langchain
    const portfolioAgent = new PortfolioAgent();
    const enhancedProfileData = await portfolioAgent.processProfile(
      rawProfileData
    );

    return NextResponse.json(enhancedProfileData);
  } catch (error) {
    console.error("Processing error:", error);
    return NextResponse.json(
      { error: "Failed to process LinkedIn profile" },
      { status: 500 }
    );
  }
}

async function scrapeLinkedInProfile(url) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  try {
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    await page.goto(url, { waitUntil: "networkidle0" });

    // Wait for key elements
    await page.waitForSelector(".pv-top-card");

    const profileData = await page.evaluate(() => {
      const getTextContent = (selector) => {
        const element = document.querySelector(selector);
        return element ? element.textContent.trim() : "";
      };

      const getArrayContent = (selector) => {
        return Array.from(document.querySelectorAll(selector))
          .map((element) => element.textContent.trim())
          .filter((text) => text.length > 0);
      };

      return {
        basicInfo: {
          name: getTextContent("h1.text-heading-xlarge"),
          headline: getTextContent("div.text-body-medium"),
          location: getTextContent(
            ".pv-text-details__left-panel .text-body-small"
          ),
          profileImage:
            document.querySelector(".pv-top-card-profile-picture__image")
              ?.src || "",
          connections: getTextContent(".pv-top-card--list span.t-bold"),
        },
        about: getTextContent("#about ~ div .pv-shared-text-with-see-more"),
        experience: Array.from(
          document.querySelectorAll(
            "#experience ~ .pvs-list__outer-container > ul > li"
          )
        ).map((exp) => ({
          title:
            exp
              .querySelector(".display-flex .visually-hidden")
              ?.textContent?.trim() || "",
          company:
            exp.querySelector(".t-14.t-normal")?.textContent?.trim() || "",
          duration:
            exp
              .querySelector(".t-14.t-normal.t-black--light")
              ?.textContent?.trim() || "",
          description:
            exp
              .querySelector(".pv-shared-text-with-see-more")
              ?.textContent?.trim() || "",
          location:
            exp
              .querySelector(".t-14.t-normal.t-black--light:nth-child(2)")
              ?.textContent?.trim() || "",
        })),
        education: Array.from(
          document.querySelectorAll(
            "#education ~ .pvs-list__outer-container > ul > li"
          )
        ).map((edu) => ({
          school:
            edu
              .querySelector(".display-flex .visually-hidden")
              ?.textContent?.trim() || "",
          degree:
            edu.querySelector(".t-14.t-normal")?.textContent?.trim() || "",
          duration:
            edu
              .querySelector(".t-14.t-normal.t-black--light")
              ?.textContent?.trim() || "",
          field:
            edu
              .querySelector(".t-14.t-normal.t-black--light:nth-child(2)")
              ?.textContent?.trim() || "",
        })),
        skills: getArrayContent(
          "#skills ~ .pvs-list__outer-container .display-flex .visually-hidden"
        ),
        certifications: Array.from(
          document.querySelectorAll(
            "#licenses_and_certifications ~ .pvs-list__outer-container > ul > li"
          )
        ).map((cert) => ({
          name:
            cert
              .querySelector(".display-flex .visually-hidden")
              ?.textContent?.trim() || "",
          issuer:
            cert.querySelector(".t-14.t-normal")?.textContent?.trim() || "",
          issueDate:
            cert
              .querySelector(".t-14.t-normal.t-black--light")
              ?.textContent?.trim() || "",
        })),
      };
    });

    return profileData;
  } finally {
    await browser.close();
  }
}
