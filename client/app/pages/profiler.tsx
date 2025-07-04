import PageLayout from "~/layouts/Page";

export default function Page() {
    return (
        <PageLayout>
            <div className="h-[720px]">
                <iframe src="https://www.speedscope.app" frameBorder="0" style={{ overflow: "hidden", width: "100%", height: "100%" }} height="100%" width="100%"></iframe>
            </div>
        </PageLayout>
    )
}